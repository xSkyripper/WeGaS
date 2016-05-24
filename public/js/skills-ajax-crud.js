$(document).ready(function () {
    $(document).on('click', '.delete-skill', function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });


        $.ajaxPrefilter(function (options, originalOptions, xhr) { // this will run before each request
            var token = $('meta[name="_token"]').attr('content'); // or _token, whichever you are using

            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token); // adds directly to the XmlHttpRequest Object
            }
        });

        var skill = JSON.parse($(this).val());
        console.log(skill);
        $.ajax({
            type: "DELETE",
            url: '/skills/' + skill.id,
            success: function (data) {
                console.log('Success: ' + data);
                $("#skillNo").load("/skills #skillNo");

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

    $(document).on('click', '.add-skill', function (e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });

        $.ajaxPrefilter(function (options, originalOptions, xhr) { // this will run before each request
            var token = $('meta[name="_token"]').attr('content'); // or _token, whichever you are using

            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token); // adds directly to the XmlHttpRequest Object
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
                $("#skillNo").load("/skills #skillNo");

                var skill_av = '<li id="skill' + skill.id + '" class="list-group-item">';
                skill_av += '<div class="container-fluid">' + skill.name;
                skill_av += '<button class="btn btn-danger btn-sm pull-right delete-skill" value="' + JSON.stringify(skill).replace(/"/g, "&quot;") + '">Delete Skill</button></div></li>';

                $('#skill' + skill.id).remove();
                $('.skill-list').append(skill_av);
            },
            error: function (data) {
                var error = JSON.parse(data.responseText);

                alert(error.msg);

                if (data.status == 413)
                    location.reload();

                console.log('Error:' + data.status + "   " + data.responseText);
            }
        });
    });
});