import React, { useState } from "react";
import Cards from "../core/Card";
import { Button, Input, TextField } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { delete_tag, delete_tasks, filter_task, insert_tags_one, insert_tasks_one, tags, update_tag, update_task } from "../graphQL/MutationQuery";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogBox from '../core/DialogBox';
import FilterComponent from "../core/FilterComponent";
import CircularLoader from "../core/CircularLoader";
import TopBar from "../core/TopBar";


function HomePage() {
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [currentEditData, setCurrentEditData] = useState();
    const [filterOpen, setFilterOpen] = useState(false);
    const [insertTag, insertTagOptions] = useMutation(insert_tags_one);
    const [insertTask, insertTaskOptions] = useMutation(insert_tasks_one);
    const [deleteTask, deleteTaskOptions] = useMutation(delete_tasks);
    const [updateTask, updateTaskOptions] = useMutation(update_task);
    const [updateTag, updateTagOptions] = useMutation(update_tag);
    const [deleteTag, deleteTagOptions] = useMutation(delete_tag);
    const queryTags = useQuery(tags);
    const queryTasks = useQuery(filter_task);

    const handleCreateSubmit = () => {
        insertTask({
            variables: {
                title: currentTitle,
                start_time: startTime,
                end_time: endTime,
                tag_id: selectedTags?.id
            }
        }).then(res => {
            queryTasks.refetch();
            reinitializeValues();
        });
    }

    const handleUpdateSubmit = () => {
        const { id, tags } = currentEditData;
        const upTk = updateTask({ variables: { id: id, title: currentTitle, start_time: startTime, end_time: endTime } });
        const upTg = updateTag({ variables: { task_id_to_update: id, current_tag_id: tags[0].id, new_tag_id: selectedTags.id } });
        Promise.all([upTk, upTg]).then(() => {
            queryTasks.refetch();
            handleReloadUpdate();
        });
    }

    const reinitializeValues = (task) => {
        setCurrentTitle(task?.title || '');
        setSelectedTags(task?.tags && task?.tags[0] ? task.tags[0] : '');
        task === null && setSelectedTags({});
        setStartTime(task?.start_time || null);
        setEndTime(task?.end_time || null);
    }

    const handleTitleChange = (event) => {
        setCurrentTitle(event.target?.value);
        console.log(currentTitle)
    }

    const tagChangeHandle = (event) => {
        setCurrentTag(event.target.value);
    }

    const handleAddTag = () => {
        insertTag({ variables: { name: currentTag } }).then(res => {
            queryTags.refetch();
        });
        setCurrentTag('');
    }

    const queryTagsHandle = (event, options) => {
        setSelectedTags(options);
    }

    const editTask = (index) => {
        reinitializeValues(queryTasks.data?.tasks[index]);
        setCurrentEditData({ ...queryTasks.data?.tasks[index] });
        setToggleUpdate(true);
    }

    const handleReloadUpdate = () => {
        reinitializeValues();
        setToggleUpdate(false);
    }

    const filterSubmit = (filterData) => {
        const { start_time, end_time, title, tags } = filterData;
        let filters = {
            start_time: start_time?.length ? start_time : null,
            end_time: end_time?.length ? end_time : null,
            title: title?.length ? title : null,
            tag_id: tags?.id ? tags.id : null,
        }
        queryTasks.refetch(filters);
    }

    return (
        <React.Fragment>
            <TopBar title="Time- Tracking App" />
            <div className="time-tracking-container">
                <div className="time-tag-container">
                    <div className="time-tracker-container">
                        <div className="title-text">Enter Task Name to keep tracking...!!!</div>
                        <Input placeholder="Title For Task" onChange={handleTitleChange} value={currentTitle} />
                        {queryTags.data?.tags &&
                            <Autocomplete
                                id="main-combo-box"
                                options={queryTags.data?.tags}
                                getOptionLabel={(option) => option?.name || ''}
                                style={{ width: 300 }}
                                onChange={queryTagsHandle}
                                loading={queryTags.loading}
                                value={selectedTags}
                                renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
                            />
                        }
                        <div className="action-container">
                            {!toggleUpdate ?
                                <Button variant="contained" color="primary" onClick={handleCreateSubmit}>
                                    ADD TASK
                                </Button>
                                :
                                <>
                                    <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
                                        UPDATE
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleReloadUpdate}>
                                        CLEAR
                                    </Button>
                                </>
                            }
                            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                                {!toggleUpdate ? "ADD TIME" : "UPDATE TIME"}
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => setFilterOpen(true)}>
                                Apply Filter
                            </Button>
                        </div>
                    </div>
                    <div className="tag-container">
                        <div className="title-text">Add Tag to map in Task..!!</div>
                        <Input onChange={tagChangeHandle} />
                        <Button variant="contained" color="primary" onClick={handleAddTag}>
                            Add
                        </Button>
                    </div>
                </div>
                <div className="card-container">
                    {queryTasks.data?.tasks?.map((data, index) => (
                        <Cards
                            id={data.id} t
                            title={data.title}
                            startTime={data.start_time}
                            endTime={data.end_time}
                            tags={data.tags[0]}
                            deleteTask={deleteTask}
                            queryTasks={queryTasks}
                            index={index}
                            editCurrentTask={editTask}
                        />
                    ))}
                </div>
            </div>
            <DialogBox
                open={open}
                setOpen={setOpen}
                selectedStartTime={startTime}
                setSelectedStartTime={setStartTime}
                selectedEndTime={endTime}
                setSelectedEndTime={setEndTime}
            />
            <FilterComponent
                setFilterOpen={setFilterOpen}
                open={filterOpen}
                filterSubmit={filterSubmit}
                tags={queryTags}
            />
            {queryTasks.loading && <CircularLoader />}
        </React.Fragment>
    )
}

export default HomePage