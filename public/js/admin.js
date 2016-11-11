$(function() {
    $('.del').click(function(e){

        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-'+id);

        // alert(tr + tr.length);

        $.ajax({
            type:'DELETE',
            url:'/admin/list?id=' + id
        })
        .done(function(results){
            if(results.success == '1')
            {
                if(tr.length > 0)
                {
                    tr.remove();
                }
            }
            else
            {
                alert('删除失败!');
            }
        })
    });
});