$(document).ready(function() {
    const form = $('#add-student-form');
    //получать всех студентов, а не только при загрузке страницы
    const studentList = $('#student-list');
  
    //get list of students from db


    function getStudents() {
        $.ajax({
            url: 'http://localhost:3000/main-students',
            method: 'get',
            dataType: 'json',
            beforeSend: function() {
                $('#loading').show();
            },
            success: function(data) {
              data.forEach(function(student) {
                const li = $('<li></li>');
                li.html(`
                  <span>${student.id}</span>
                  <span>${student.имя}</span>
                  <span>${student.фамилия}</span>
                  <span>${student.отчество}</span>
                  <button class="delete-btn">x</button>
                `);
                studentList.append(li);
              });
            },
            error: function(err) {
              console.log(err);
            },
            complete: function() {
                $('#loading').hide();
            }
          });
    }
   
    getStudents();
    console.log(studentList);

    // add student
    form.on('submit', function(event) {
      event.preventDefault();
      const name = $('#name').val();
      const surname = $('#surname').val();
      const patronymic = $('#patronymic').val();
      const date = $('#date').val();
      const group = $('#group').val();
  
      $('#name').val('');
      $('#surname').val('');
      $('#patronymic').val('');
      $('#date').val('');
      $('#group').val('');
      $.ajax({
        url: 'http://localhost:3000/main',
        method: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ name, surname, patronymic, date, group }),
        beforeSend: function() {
            $('#loading').show();
        },
        success: function(res) {
            const li = $('<li></li>');
            li.html(`
              <span>${res[0].id}</span>
              <span>${res[0].имя}</span>
              <span>${res[0].фамилия}</span>
              <span>${res[0].отчество}</span>
              <button class="delete-btn">x</button>
            `);
            studentList.append(li);
        },
        error: function(err) {
          console.log(err);
        },
        complete: function() {
            $('#loading').hide();
        }
      });
    });
  
    // delete student
    studentList.on('click', '.delete-btn', function(event) {
      const id = $(this).parent().find('span').first().text();
      console.log(id);
      $.ajax({
        url: 'http://localhost:3000/main-students-delete',
        method: 'delete',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ id }),
        beforeSend: function() {
            $('#loading').show();
        },
        success: function(res) {
          console.log(res);
          $(event.target).parent().remove();
        },
        error: function(err) {
          console.log(err);
        },
        complete: function() {
            $('#loading').hide();
        }
      });
    });
  });