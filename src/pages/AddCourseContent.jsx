import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import PageHeading from '../Components/PageHeading'
import PageSubHeading from '../Components/PageSubHeading'
import PageHeadingContainer from '../Components/PageHeadingContainer'
import TextFields, { TextFieldPassword } from '../Components/TextFields'

function AddCourseContent() {



    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", paddingTop: "10px" }}>

            <PageHeadingContainer
                heading="Courses"
                subHeading="Some sub heading for this page"
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "50px", marginTop: "50px", width: "100%", height: "100vh", marginLeft: "auto", marginRight: "auto" }}>
                <Box sx={{ widdisplay: "flex" }}>
                    <Box>

                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default AddCourseContent