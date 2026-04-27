  // Section visibility management - Task 4 UX Design
        function showSection(sectionToShow) {
            // Hide all sections
            const sections = ['home', 'create', 'read', 'update', 'delete'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    element.classList.remove('active');
                }
            });
            
            // Show selected section
            const showElement = document.getElementById(sectionToShow);
            if (showElement) {
                showElement.classList.add('active');
            }
            
            // Load dynamic content when needed
            if (sectionToShow === 'read') {
                loadReadData();
            } else if (sectionToShow === 'update') {
                loadUpdateData();
            } else if (sectionToShow === 'delete') {
                loadDeleteData();
            }
        }
        
        // Clear Fields functionality - Task 5
        function clearAllFields() {
            const form = document.getElementById('createForm');
            if (form) {
                const inputs = form.querySelectorAll('input');
                inputs.forEach(input => {
                    if (input.type === 'text' || input.type === 'number') {
                        input.value = '';
                    }
                });
            }
            
            // Also clear any update form fields if they exist
            const updateForm = document.getElementById('updateStudentForm');
            if (updateForm) {
                const inputs = updateForm.querySelectorAll('input');
                inputs.forEach(input => {
                    if (input.type === 'text' || input.type === 'number') {
                        input.value = '';
                    }
                });
            }
        }
        
        // Attach clear button event
        document.addEventListener('DOMContentLoaded', function() {
            const clearBtn = document.getElementById('clrbtn');
            if (clearBtn) {
                clearBtn.addEventListener('click', clearAllFields);
            }
            
            // Check URL for success message
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('status') === 'success') {
                const toast = document.getElementById('success-toast');
                if (toast) {
                    toast.style.display = 'block';
                    setTimeout(() => {
                        toast.style.display = 'none';
                    }, 3000);
                }
                // Remove from URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        });
        
        // Read functionality - fetch and display students
        function loadReadData() {
            fetch('includes/fetch_students.php')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('readContent');
                    if (data.success && data.students.length > 0) {
                        let html = '<table class="student-table">';
                        html += '<thead><tr><th>ID</th><th>Surname</th><th>Name</th><th>Middle Name</th><th>Address</th><th>Contact</th></tr></thead><tbody>';
                        data.students.forEach(student => {
                            html += `<tr>
                                <td>${student.id}</td>
                                <td>${escapeHtml(student.surname)}</td>
                                <td>${escapeHtml(student.name)}</td>
                                <td>${escapeHtml(student.middlename || '')}</td>
                                <td>${escapeHtml(student.address || '')}</td>
                                <td>${escapeHtml(student.contact_number || '')}</td>
                            </tr>`;
                        });
                        html += '</tbody></table>';
                        container.innerHTML = html;
                    } else {
                        container.innerHTML = '<p class="message error">No students found in database.</p>';
                    }
                })
                .catch(error => {
                    document.getElementById('readContent').innerHTML = '<p class="message error">Error loading data. Please ensure database is set up.</p>';
                    console.error('Error:', error);
                });
        }
        
        // Update functionality
        function loadUpdateData() {
            fetch('includes/fetch_students.php')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('updateContent');
                    if (data.success && data.students.length > 0) {
                        let html = '<table class="student-table">';
                        html += '<thead><tr><th>ID</th><th>Surname</th><th>Name</th><th>Middle Name</th><th>Address</th><th>Contact</th><th>Action</th></tr></thead><tbody>';
                        data.students.forEach(student => {
                            html += `<tr id="student-row-${student.id}">
                                <td>${student.id}</td>
                                <td><span class="display-surname-${student.id}">${escapeHtml(student.surname)}</span></td>
                                <td><span class="display-name-${student.id}">${escapeHtml(student.name)}</span></td>
                                <td><span class="display-middlename-${student.id}">${escapeHtml(student.middlename || '')}</span></td>
                                <td><span class="display-address-${student.id}">${escapeHtml(student.address || '')}</span></td>
                                <td><span class="display-contact-${student.id}">${escapeHtml(student.contact_number || '')}</span></td>
                                <td><button class="action-btn edit-btn" onclick="editStudent(${student.id})">Edit</button></td>
                            </tr>`;
                        });
                        html += '</tbody></table>';
                        container.innerHTML = html;
                    } else {
                        container.innerHTML = '<p class="message error">No students found to update.</p>';
                    }
                })
                .catch(error => {
                    document.getElementById('updateContent').innerHTML = '<p class="message error">Error loading data.</p>';
                });
        }
        
        function editStudent(id) {
            // Fetch student details
            fetch(`includes/get_student.php?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const student = data.student;
                        const row = document.getElementById(`student-row-${id}`);
                        if (row) {
                            row.innerHTML = `
                                <td>${student.id}</td>
                                <td><input type="text" id="edit-surname-${student.id}" value="${escapeHtml(student.surname)}" class="field" style="width:100%"></td>
                                <td><input type="text" id="edit-name-${student.id}" value="${escapeHtml(student.name)}" class="field" style="width:100%"></td>
                                <td><input type="text" id="edit-middlename-${student.id}" value="${escapeHtml(student.middlename || '')}" class="field" style="width:100%"></td>
                                <td><input type="text" id="edit-address-${student.id}" value="${escapeHtml(student.address || '')}" class="field" style="width:100%"></td>
                                <td><input type="text" id="edit-contact-${student.id}" value="${escapeHtml(student.contact_number || '')}" class="field" style="width:100%"></td>
                                <td>
                                    <button class="action-btn" style="background:#28a745;color:white" onclick="saveUpdate(${student.id})">Save</button>
                                    <button class="action-btn" style="background:#6c757d;color:white" onclick="loadUpdateData()">Cancel</button>
                                </td>
                            `;
                        }
                    }
                });
        }
        
        function saveUpdate(id) {
            const surname = document.getElementById(`edit-surname-${id}`).value;
            const name = document.getElementById(`edit-name-${id}`).value;
            const middlename = document.getElementById(`edit-middlename-${id}`).value;
            const address = document.getElementById(`edit-address-${id}`).value;
            const contact = document.getElementById(`edit-contact-${id}`).value;
            
            fetch('includes/update_student.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id=${id}&surname=${encodeURIComponent(surname)}&name=${encodeURIComponent(name)}&middlename=${encodeURIComponent(middlename)}&address=${encodeURIComponent(address)}&contact=${encodeURIComponent(contact)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Student updated successfully!');
                    loadUpdateData();
                } else {
                    alert('Error: ' + data.message);
                }
            });
        }
        
        // Delete functionality
        function loadDeleteData() {
            fetch('includes/fetch_students.php')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('deleteContent');
                    if (data.success && data.students.length > 0) {
                        let html = '<table class="student-table">';
                        html += '<thead><tr><th>ID</th><th>Surname</th><th>Name</th><th>Middle Name</th><th>Address</th><th>Contact</th><th>Action</th></tr></thead><tbody>';
                        data.students.forEach(student => {
                            html += `<tr>
                                <td>${student.id}</td>
                                <td>${escapeHtml(student.surname)}</td>
                                <td>${escapeHtml(student.name)}</td>
                                <td>${escapeHtml(student.middlename || '')}</td>
                                <td>${escapeHtml(student.address || '')}</td>
                                <td>${escapeHtml(student.contact_number || '')}</td>
                                <td><button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
                            </tr>`;
                        });
                        html += '</tbody></table>';
                        container.innerHTML = html;
                    } else {
                        container.innerHTML = '<p class="message error">No students found to delete.</p>';
                    }
                });
        }
        
        function deleteStudent(id) {
            if (confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
                fetch('includes/delete_student.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `id=${id}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Student deleted successfully!');
                        loadDeleteData();
                        // Also refresh read and update data if they're loaded
                        if (document.getElementById('read').classList.contains('active')) {
                            loadReadData();
                        }
                        if (document.getElementById('update').classList.contains('active')) {
                            loadUpdateData();
                        }
                    } else {
                        alert('Error: ' + data.message);
                    }
                });
            }
        }
        
        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }