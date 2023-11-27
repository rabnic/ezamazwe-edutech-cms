import InputLabel from '@mui/material/InputLabel';
import { Box, FormControl, IconButton, InputAdornment, Link, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';


export default function SelectField({ label, type = "text", errorStatus, errorMessage, state, setState, isMultiline = false, numberOfRows = 1 }) {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "auto", width: "100%", minWidth: "300px", alignItems: "flex-start" }}>
            <InputLabel sx={{ marginBottom: "10px", color: "primary.light", fontSize: "18px", textAlign: "left" }}>{label}</InputLabel>
            <FormControl variant="outlined" margin={"1"} style={{ width: "100%", height: "50px", fontSize: "16px", borderRadius: "10px" }}>
                <Select
                    defaultChecked="1"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    sx={{
                        width: "100%", height: isMultiline ? "auto" : "50px", fontSize: "16px", borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "primary.light",
                            borderWidth: 2
                        },
                        "&:hover > .MuiOutlinedInput-notchedOutline": {
                            borderColor: "primary.main"
                        }
                    }}
                >
                    <MenuItem key={1} value="test1">
                        Test 1
                    </MenuItem>
                    <MenuItem key={2} value="test2">
                        Test 2
                    </MenuItem>
                </Select>
            </FormControl>
            {errorStatus ?
                <InputLabel sx={{ color: "warning.main", fontSize: "12px", marginTop: "10px", marginLeft: "5px" }}>{errorMessage}</InputLabel>
                : null}
        </Box>
    )
}