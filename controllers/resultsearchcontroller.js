function loadingresults(admissionNo) {
//    alert('ok');
    var tableData;
    $.post("models/modelresultsearch.php", {loading_results: 'table', admissionNo: admissionNo}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {

            $('#resultform').hide();
            $('#noresult').show();
            $('#noresult').text("No Data Found in Database");
            $('#resultform').hide();

        } else {
            $.each(e, function (index, data) {
                $('#vclass').show();
                $('#admisionnum').text(data.admission_no);
                $('#studentname').text(data.namewithinitial);
                $('#examdate').text(data.examDate);
                $('#vclass').text(data.vehicle_class);
                $('#writtenresults').text(data.writtenResult);
                $('#status').text(data.passOrFail);
                $('#resultform').show();
//////////should hide
                $('#vclassA').hide();
                $('#vclassB').hide();
                $('#vclassB1').hide();
                $('#noresults').hide();
                $('#practicalexam1').hide();







            });
            //Load Json Data to Table
            $('#tbldetails tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.deletecustomer').click(function () {
                teacher_id_for_delete = $(this).val();
                confirm("Deletion of Company Data", "Are you sure want to delete This Teacher", "No", "Yes", function () {
                    $.post("models/customerManagementModel.php", {delete_teacher: 'delete', teacher_id_for_delete: teacher_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                swal("Deleted!", "Teacher has been deleted successfully ", "success");
                            } else if (valueDel.msgType === 2) {
                                swal("Something Went Wrong", "Your Data could not Deleted", "warning");
                            }
                        });
                        teacher_data_table();
                    }, "json");
                });
            });
            $('.editcustomer').click(function () {
                $('#btnUpdate').show();
                $('#btnCancel').show();
                $('#btnSave').hide();
                $('#tid').val($(this).val());
                var teacherID = $('#tid').val();

                $.post("models/customerManagementModel.php", {get_teacher_data_to_up: 'upData', teacherID: teacherID}, function (up) {
                    $.each(up, function (index, data) {
                        $('#tname').val(data.name);
                        $('#tclass').val(data.class);
                    });
                }, "json");
            });
        }
    }, "json");
}


function loadingresultspractical(admissionNo) {
//    alert('ok');
    var tableData;
    $.post("models/modelresultsearch.php", {loading_practical_results: 'table', admissionNo: admissionNo}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            $('#resultform').hide();
            $('#noresult').show();
            $('#noresult').text("No Data Found in Database");

        } else {
            $.each(e, function (index, data) {
//               
                $('#writtenmarkstab').hide();
                $('#writtenstatustab').hide();


                $('#resultform').show();
                $('#vclassA').show();
                $('#vclassB').show();
                $('#vclassB1').show();
                $('#vclass').hide();
                $('#admisionnum').text(data.admission_no);
                $('#studentname').text(data.namewithinitial);
                $('#examdate').text(data.examDate);
                $('#vclassA').text(data.a + " - " + data.a_pass_or_fail + " :   :  " + data.g + " - " + data.g_pass_or_fail);
                $('#vclassB').text(data.b + " - " + data.b_pass_or_fail + " :   :  " + data.d + " - " + data.d_pass_or_fail);
                $('#vclassB1').text(data.bone + " - " + data.bone_pass_or_fail + " :   :  " + data.ce + " - " + data.ce_pass_or_fail);

            });
            //Load Json Data to Table


            //Delete Data through Delete button


        }
    }, "json");
}