import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeadingContainer from "../Components/PageHeadingContainer";
import SubjectCard from "../Components/SubjectCard";
import { fetchFilteredCourseDocuments } from "../services/firebase";
import Breadcrumb from "../Components/navigation/Breadcrumb";
import { useParams, useLocation } from "react-router-dom";


function CourseList() {
  const [filteredCourseDocuments, setFilteredCourseDocuments] = useState([]);
  const [isLoading, setIsloading] = useState(false)
  const params = useParams();
  const location = useLocation();

  const replaceAllDashesWithSpace = (text) => {
    return text.replaceAll("-", " ")
  }

  const replaceAllSpacesWithUderscore = (text) => {
    return replaceAllDashesWithSpace(text).replaceAll(" ", "_")
  }
  const courseFilterOptions = {
    courseCategory: params.subCategory.toLowerCase(),
    grade: replaceAllSpacesWithUderscore(params.subjects),
    subject: replaceAllDashesWithSpace(params.course),
  }

  console.log("courseFilterOptions", courseFilterOptions)


  useEffect(() => {
    const tester = async () => {
      try {
        setIsloading(true)
        console.log("trying to fetch")
        const data = await fetchFilteredCourseDocuments(courseFilterOptions.courseCategory, courseFilterOptions.grade, courseFilterOptions.subject);
        console.log(data)
        setFilteredCourseDocuments(data)
      } catch (error) {
        console.log("Failed to fetch", error)
      } finally {
        setIsloading(false)
      }

    }
    tester()
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingTop: "20px",
        gap: "50px",
      }}
    >
      <PageHeadingContainer
        heading={`${params.course}`}
        subHeading="Filtered course list."
      />
      <Breadcrumb />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          gap: "20px",
          width: "100%"
        }}
      >
        {
          filteredCourseDocuments.length > 0 &&

          filteredCourseDocuments.map(course => {
            return (
              <SubjectCard
                key={course.id}
                Topic={course.courseName}
                Duration={"Duration: 1 h 30 m"}
                Description={
                  course.courseShortDescription
                }
                category={course.courseType}
              />
            )
          })
        }
      

        
      </Box>

    </Box>
  );
}

export default CourseList;
