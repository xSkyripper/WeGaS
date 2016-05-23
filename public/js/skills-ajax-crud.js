$(document).ready(function () {
    $(document).on('click','.delete-skill',function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });

        var skill = JSON.parse($(this).val());
        console.log(skill);
        $.ajax({
            type: "DELETE",
            url: '/skills/' + skill.id,
            success: function (data) {
                console.log('Success: ' + data);


                var skill_ua = '<li id="skill' + skill.id + '" class="list-group-item list-group-item-success">';
                skill_ua += '<div class="container-fluid">' + skill.name;
                skill_ua += '<button class="btn btn-success btn-sm pull-right add-skill" value="' + JSON.stringify(skill).replace(/"/g, "&quot;") + '">Add Skill</button></div></li>';

                $('#skill' + skill.id).remove();
                $('.skill-list').append(skill_ua);
            },
            error: function (data) {
                console.log('Error:' + data);
            }
        });

    });

    $(document).on('click','.add-skill',function (e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });

        e.preventDefault();

        var skill = JSON.parse($(this).val());

        $.ajax({
            type: "POST",
            url: "/skills/" + skill.id,
            data: skill,
            success: function (data) {
                console.log('Success:', data);


                var skill_av = '<li id="skill' + skill.id + '" class="list-group-item">';
                skill_av += '<div class="container-fluid">' + skill.name;
                skill_av += '<button class="btn btn-danger btn-sm pull-right delete-skill" value="' + JSON.stringify(skill).replace(/"/g, "&quot;") + '">Delete Skill</button></div></li>';

                $('#skill' + skill.id).remove();
                $('.skill-list').append(skill_av);
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });
});