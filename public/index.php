<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Operations</title>
     <link   rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjkwIiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iMTAwIiB5PSIxMjAiIGZvbnQtc2l6ZT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiPk5IPC90ZXh0Pjwvc3ZnPg==" id="logo" alt="NorthHub">
        <button class="navbarbuttons" onclick="showSection('create')">Create</button>
        <button class="navbarbuttons" onclick="showSection('read')">Read</button>
        <button class="navbarbuttons" onclick="showSection('update')">Update</button>
        <button class="navbarbuttons" onclick="showSection('delete')">Delete</button>
    </nav>
    
    <section id="home" class="homecontent active"> 
        <h1 class="splash">Welcome to Student Management System</h1>
        <h2 class="splash">A Project in Integrative Programming Technologies</h2>
    </section>
    
    <section id="create" class="content">
        <h1 class="contenttitle">Insert New Sfghtudent</h1>
        <form id="createForm" action="../includes/insert.php" method="POST">
            <label for="surname" class="label">Surname</label>
            <input type="text" name="surname" id="surname" class="field" required><br/>

            <label for="name" class="label">Name</label>
            <input type="text" name="name" id="name" class="field" required><br/>

            <label for="middlename" class="label">Middle name</label>
            <input type="text" name="middlename" id="middlename" class="field"><br/>

            <label for="address" class="label">Address</label>
            <input type="text" name="address" id="address" class="field"><br/>

            <label for="contact" class="label">Mobile Number</label>
            <input type="text" name="contact" id="contact" class="field"><br/>

            <div id="btncontainer">
                <button type="button" id="clrbtn" class="btns">Clear Fields</button><br/>
                <button type="submit" id="savebtn" class="btns">Save</button>
            </div>
            <div id="success-toast" class="toast-hidden">Registration Successful!</div>
        </form>   
    </section>

    <section id="read" class="content">
        <h1 class="contenttitle">View Students</h1>
        <div id="readContent">Loading...</div>
    </section>

    <section id="update" class="content">
        <h1 class="contenttitle">Update Student Records</h1>
        <div id="updateContent">Loading...</div>
    </section>

    <section id="delete" class="content">
        <h1 class="contenttitle">Remove Student Records</h1>
        <div id="deleteContent">Loading...</div>
    </section>

        <script src="script.js"></script>
</body>
</html>