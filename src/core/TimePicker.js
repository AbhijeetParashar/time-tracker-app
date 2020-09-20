import React from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';


export default function TimePicker(props) {

    const handleDateChange = (date) => {
        props.setSelectedTime(date ? date.toISOString() : "");
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-around">
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label={props.label || "Time picker"}
                    value={props.selectedTime || null}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}