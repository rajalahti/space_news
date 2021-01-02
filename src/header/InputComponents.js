import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';


export const SelectField = props => (
    <FormControl className={props.className} variant="outlined">
      {props.label ? (<InputLabel id={props.label} >{props.label}</InputLabel> ) : "" }
      <Select
        labelId={props.label}
        label={props.label}
        id="select"
        value={props.stateValue}
        onChange={props.onChange}
        style={{color: '#a1ecfb', fontSize: '1em'}}
      >
        {props.values.map((value, index) => {
          return (
            <MenuItem key={index} value={value} style={{color: 'black'}}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );

  export const TextInput = props => (
    <form noValidate autoComplete="off">
      <TextField id={props.label} label={props.label} variant="outlined" className={props.className} onChange={props.onChange}/>
    </form>
  );