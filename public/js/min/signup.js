$(function(){$(".button").bind("click touchstart",function(){function a(b){return $.trim($(b).val()).length}var c=$(".first"),f=$(".last"),d=parseInt($(".class").val())||0,e=$(".ical"),g=$(".username"),h=$(".password");2017>d||2020<d?$(".message").text("Please enter a valid year.").fadeIn().delay(2E3).fadeOut():a(c)&&a(f)&&a(g)&&a(e)&&a(h)?e.val().startsWith("https://unify-ext.andover.edu/extranet/Student/OpenCalendar")?(c={name:{first:c.val(),last:f.val()},ical:e.val(),"class":d,username:g.val(),
password:h.val()},$.ajax({type:"POST",url:"/signup",data:c,beforeSend:function(){$(".loading").show()},complete:function(){$(".loading").hide()},success:function(b){201===b.code?($(".message").text("Your account was created, a verification email has been sent to your Andover account.").fadeIn(),setTimeout(function(){window.location="/"},5E3)):400===b.code?$(".message").text("Your iCal URL looks incorrect, try again?").fadeIn().delay(2E3).fadeOut():409===b.code?$(".message").text("A user with that username already exists.").fadeIn().delay(2E3).fadeOut():
$(".message").text("Error creating your account.").fadeIn().delay(2E3).fadeOut()},error:function(b,a,c){$(".message").text("Error creating your account.").fadeIn().delay(2E3).fadeOut()}})):$(".message").text("Your iCal URL looks incorrect, try again?").fadeIn().delay(2E3).fadeOut():$(".message").text("Please complete the entire form.").fadeIn().delay(2E3).fadeOut()})});