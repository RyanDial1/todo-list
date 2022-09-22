//factory function to create empty project (array)
export const project = () => {
    console.log("project function called");
    let projects = [];
    let projectTitle = "Get gas";
    projects.push({projectTitle});
    console.log(project);
    return {
        projects, projectTitle
    };

}