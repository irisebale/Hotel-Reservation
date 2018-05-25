function login() {
     $.ajax(
         {
             url: "http://127.0.0.1:5000/login/",
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify({
                 'username': $("#username").val(),
                 'password': $("#password").val()
             }),
             type: "POST",
             dataType: "json",

             error: function (resp) {
                 //window.location.replace('404.html');
             },

             success: function (resp) {
                 if (resp.status === 'ok') {
                     window.location.replace('front.html')
                 }
                 else {
                     window.location.replace('ui/404.html?username=' + resp.message + '/')
                 }
             }
         }
     );

 }


 function reserves() {
     $.ajax(
         {
             url: "http://127.0.0.1:5000/reserve/",
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify({
                 'hname': $("#hname").val(),
                 'firstname': $("#firstname").val(),
                 'lastname': $("#lastname").val(),
                 'contactnum': $("#contactnum").val(),
                 'roomsize': $("#roomsize").val(),
                 'checkin': $("#checkin").val(),
                 'checkout': $("#checkout").val(),
                 'duration': $("#duration").val(),
                 'roomnum': $("#roomnum").val()
             }),
             type: "POST",
             dataType: "json",

             error: function (resp) {
                 //window.location.replace('404.html');
                 alert("kapit lang!");
                 window.location.replace('reserve.html');
             },

             success: function (resp) {
                // alert(resp.status);
                 alert("Successfully updated!");
                 window.location.replace('reserve1.html');
             }
         }
     );

 }

function view(){

 	 $("#reserve1").show();

 $.ajax({
     		url: 'http://127.0.0.1:5000/view_profile',
     		type: "GET",
     		dataType: "json",
     		success: function(resp) {

 				if (resp.status  == 'ok') {
 				   for (i = 0; i < resp.count; i++)
                                   {
                                       hname = resp.entries[i].hname;
 									   firstname = resp.entries[i].firstname;
 									   lastname = resp.entries[i].lastname;
 									   contactnum = resp.entries[i].contactnum;
 									   roomsize = resp.entries[i].roomsize;
 									   checkin = resp.entries[i].checkin;
 									   checkout = resp.entries[i].checkout;
 									   duration = resp.entries[i].duration;
 									   roomnum = resp.entries[i].roomnum;
                                        $("#reserve1").append(reserve1(hname, firstname,lastname, contactnum, roomsize, checkin, checkout, duration, roomnum));

                                   }
 				} else
 				{
                                        $("#reserve1").html("");
 					alert(resp.message);
 				}
     		}
 		});
 }


 function reserve1(hname,firstname,lastname,contactnum,roomsize,checkin,checkout,duration,roomnum)
{
     return '<tr>'+

                        '<th class="w3-center" style="margin-top: 500px">Hotel Name</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Firstname</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Lastname</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Contact No.</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Room Size</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Check In</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Check Out.</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Duration</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Room No.</th>'+

                     '</tr>' +'<tr>'+
              '<td>' +hname+ '</td>' +
              '<td>' +firstname+ '</td>' +
              '<td>' +lastname+ '</td>' +
              '<td>' +contactnum+ '</td>' +
              '<td>' +roomsize+ '</td>' +
              '<td>' +checkin+ '</td>' +
              '<td>' +checkout+ '</td>' +
              '<td>' +duration+ '</td>' +
              '<td>' +roomnum+ '</td>' +
              '</tr>';

   // return '<div class="container-fluid" >' +
   //     '<h6>Hotel Name:</h6>'+
	//    '<b><p>' +hname+  '</p></b>'+
   //     '<h6>First Name:</h6>'+
	//    '<b><p>' +firstname+  '</p></b>'+
   //     '<h6>Last Name:</h6>'+
	// 	'<b><p>' +lastname+ '</p></b>'+
   //     '<h6>Contact Number:</h6>'+
	//    '<b><p>' +contactnum+ '</p></b>'+
   //     '<h6>Room Size:</h6>'+
	// 	'<b><p>' +roomsize+ '</p></b>'+
   //     '<h6>Check in:</h6>'+
	// 	'<b><p>' +checkin+ '</p></b>'+
   //     '<h6>Check out:</h6>'+
	// 	'<b><p>' +checkout+ '</p></b>'+
   //     '<h6>Duration:</h6>'+
	// 	'<b><p>' +duration+ '</p></b>'+
   //      '<h6>Room Number:</h6>'+
	// 	'<b><p>' +roomnum+ '</p></b>'+
   //     '</div>'
}


function delete_reservation() {
	$.ajax(
		{
			url: 'http://127.0.0.1:5000/delete_reservation1',
			contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                 'del': $("#del").val()
             }),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("Deleted!");
					window.location.replace('front.html');

                 }
				else {
					alert("ERROR");
				}

			}
		});
}


  function searchhotel() {

     $("#viewsearchh").show();

     $.ajax(
         {
             url: "http://127.0.0.1:5000/search/",
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify({
                 'hotelname1': $("#hotelname1").val()
             }),
             type: "POST",
             dataType: "json",
             error: function (e) {
             },
             success: function (resp) {
                 if (resp.status == 'ok') {
                     for (i = 0; i < resp.count; i++) {
                         hotelname1 = resp.entries[i].hotelname1;
                         address = resp.entries[i].address;
                         contact_num = resp.entries[i].contact_num;
                         price = resp.entries[i].price;
                         $("#viewsearchh").append(viewsearchh(hotelname1, address, contact_num, price));
                     }
                 }
                 else {
                     $("viewsearchh").html("");

                    alert("Successfully updated!");
             }
         }
 });

}



function viewsearchh(hotelname1, address, contact_num, price)
 {
     return '<tr>'+

                        '<th class="w3-center" style="margin-top: 500px">Hotel Name</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Address</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Contact Number</th>'+
                        '<th class="w3-center" style="margin-top: 500px">Price</th>'+

                     '</tr>' +'<tr>'+
              '<td>' +hotelname1+ '</td>' +
              '<td>' +address+ '</td>' +
              '<td>' +contact_num+ '</td>' +
              '<td>' +price+ '</td>' +
              '</tr>';

  }



     // '<div class="container-fluid" >' +
     //   '<h6>Hotel Name:</h6>'+
	  //  '<b><p>' +hotelnames+  '</p></b>'+
       // '<h6>Address:</h6>'+
		// '<b><p>' +address+ '</p></b>'+
       // '<h6>Contact Number:</h6>'+
       // '<b><p>' +contact_num+ '</p></b>'+
       // '<h6>Price:</h6>'+
		// '<b><p>' +price+ '</p></b>'+
       // '</div>'
// }






