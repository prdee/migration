const pointerData = (courseData) =>{
    const coursePointer = courseData.coursePointer;
    if(coursePointer?.length){
        return coursePointer.map((data)=>{
            return {
                title : data.title,
                description : data.description,
                image : data.image 
            }
        })
    }else {
        return [{
            title : courseData.FeatureOne[0],
            description : courseData.FeatureOne[1],
        },{
            title : courseData.FeatureTwo[0],
            description : courseData.FeatureTwo[1],
        },{
            title : courseData.FeatureThree[0],
            description : courseData.FeatureThree[1],
        }]

    }
}
const convertDateToTimestamp = (date) =>{
    return Math.floor(new Date(date).getTime() / 1000);
  }
const chapterMeta = (data)=>{
    const chapterMetaData = [];
    if(!data?.length){
      return [];
    }
    for(let courseChapterMeta of data){
        for(let chapter of courseChapterMeta.chapter){
            chapterMetaData?.push({
                examId : +courseChapterMeta.examId,
                subjectId : +courseChapterMeta.subjectId,
                chapter : +chapter.chapterID
            })
        }
    }
    return chapterMetaData;
}
const convertCourseToGroup = (course) => {
  const group = {
    name: course.name,
    description: course.description,
    isRecorded: course.isRecordedCourse || false,
    startDate: course.startDate,
    endDate: course.endDate,
    language: course.language,
    curriculum: course.curriculum,
    isPaid: course.courseCommercial === "paid",
    tenantId: [1],
    subTenantId: [],
    isActive: course.isActive,
    durationType: course.type,
    type: course.courseType,
    grades: course.grade?.toString()?.split(',').map(Number),
    subjects: new Set(course.subjectMeta?.map((subject)=> +subject.subjectId)),
    subjectMeta: course.subjectMeta?.map((meta) => ({
        examId: +meta.examId,
        subjectId: +meta.subjectId,
      })),
    exams: new Set(course.subjectMeta?.map((exam)=> +exam.examId)),
    examGrades: course.examGrade,
    duration: course.duration,
    chapterMeta:chapterMeta(course.courseChapterMeta),
    teachers: course.teachers.map((teacher) => ({
        subjects: teacher.subjects,
        id: teacher.id,
      })),
    pointer: pointerData(course),
    createdAt: convertDateToTimestamp(course.createdAt),
    updatedAt: convertDateToTimestamp(course.updatedAt),
    oldId : course._id,
    subGroup : course.batches,
    _id : course._id
  };
  return group;
};

module.exports = {
  convertCourseToGroup,
};
