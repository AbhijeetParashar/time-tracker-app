import React, { useState, useEffect } from 'react';
import { Button, CardContent, makeStyles, Card } from '@material-ui/core';
import { getDifference, getTime } from '../component/Timer';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 500
    }
});

const Cards = (props) => {
    console.log(props)
    const classes = useStyles();
    const [intervalIndex, setIntervalIndex] = useState(null);
    const [toggleTimer, setToggleTimer] = useState(false);

    useEffect(() => {
        clearInterval(intervalIndex);
        const timeDiff = getDifference(props.startTime, props.endTime);
        setIntervalIndex(getTime(timeDiff, `timer-wrapper-${props.id}`));
    }, [props.startTime, props.endTime]);

    const updatehandle = () => {
        props.editCurrentTask(props.index);
    }

    const deleteSelectedTask = () => {
        props.deleteTask({ variables: { id: props.id } }).then((res) => {
            props.queryTasks.refetch();
        });
    }

    const handleToggleTimer = () => {
        const stateToChange = !toggleTimer;
        if (stateToChange) clearInterval(intervalIndex);
        else {
            const timeDiff = window?.timer[`timer-wrapper-${props.id}`];
            setIntervalIndex(getTime(timeDiff, `timer-wrapper-${props.id}`));
        }
        setToggleTimer(stateToChange);
    }

    return (
        <React.Fragment>
            <div className="card-wrapper">
                <Card className={classes.root}>
                    <CardContent className="card-content-wrapper">
                        <div className="card-section">
                            <div className="card-title-content">
                                <div className="card-content-title">Title: </div>
                                <div className="card-title">{props.title?.length ? props.title : '--'}</div>
                            </div>
                            <div className="card-title-content">
                                <div className="card-content-title">Tag: </div>
                                <div className="card-title">{props.tags?.name?.length ? props.tags.name : '--'}</div>
                            </div>
                            <Button variant="outlined" color="primary" onClick={updatehandle}>
                                EDIT
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={deleteSelectedTask}>
                                DELETE
                            </Button>
                            {props.startTime && props.endTime &&
                                <Button variant="outlined" color={toggleTimer ? "primary" : "secondary"} onClick={handleToggleTimer}>
                                    {toggleTimer ? 'START' : 'STOP'}
                                </Button>
                            }
                        </div>
                        <div className="timer-section">
                            <div>
                                <div style={{color: "#c5403a"}}  className="card-content-title">Timer </div>
                                <div style={{color: "#2a4254"}}id={`timer-wrapper-${props.id}`}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Cards;