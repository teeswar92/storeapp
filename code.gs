function doGet() 
{
  return HtmlService.createHtmlOutputFromFile('Index');
}
function existing_employees()
{
  sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('patient_sheets')
  values=sh.getRange(1, 1,sh.getLastRow(),sh.getLastColumn()).getValues()
  Logger.log("here"+values)
  table='<table>'
  for(i=0;i<sh.getLastRow();i++)
  {
  table+='<tr>'
  for(j=0;j<sh.getLastColumn();j++)
  {
    if(i!=0&&j==3)
    {
      table+='<td>'+'<input type="button" name="'+values[i][j-1]+'" value="patient_page" id="'+values[i][j]+'" onclick="google.script.run.withSuccessHandler(display).withUserObject(this).get_patient_sheet()" />'+'</td>';
    }
    else
  table+='<td>'+values[i][j]+'</td>'
  }
    table+='</tr>'
  }
  table+='</table>'
  return {'table':table}
}
function get_patient_sheet()
{
  Logger.log("here")
  return 1;
}
function getPatientMedicines(id)
{
  sheet=SpreadsheetApp.openById(id);
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy")
  var sh=sheet.insertSheet().setName(date)
  table='<table>'
  table+='<tr>'+'<th>'+'MEDICINE'+'</th>'+'<th>'+'DOSAGE'+'</th>'+'<th>'+'TIME'+'</th>'+'</tr>'
  for(i=0;i<10;i++)
  {
    table+='<tr>'
    for(j=0;j<3;j++)
    {
      table+='<td>'+'<input type="text" id="'+i+j+'"'+'</td>'
    }
    table+='</tr>'
  }
  table+='</table>'
  Logger.log("hey")
  return{'table':table,'shname':date,'shid':id}
}
function newuser()
{ Logger.log("newuser")
  string='<table>'+'<tr>'+'<td>'+'ENTER YOUR NAME'+'</td>'+'<td>'+'<input type="text" id="pname">'+'</td>'+'<tr>';
  string+='<tr>'+'<td>'+'ENTER YOUR PHONE NUMBER'+'</td>'+'<td>'+'<input type="text" id="pno">'+'</td>'+'</tr>'
  string+='<tr>'+'<td>'+'ENTER YOUR EMAIL ID'+'</td>'+'<td>'+'<input type="text" id="pmail">'+'</td>'+'</tr>'+'</table>'
  string+='<input type="button" name="submit" value="submit" id="updatebut" onclick="google.script.run.withSuccessHandler(onSuccess).withUserObject(this).submitnewuserdetails(document.getElementById(\'pname\').value,document.getElementById(\'pno\').value,document.getElementById(\'pmail\').value)" ></input>'
  Logger.log(string);
  return{'table':string}
}



function submitnewuserdetails(a,b,c)
{
  Logger.log(a+b+c)
  var ss=SpreadsheetApp.create(b)
  var id=ss.getId();
  var existing=SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var esh=existing[0];
  esh.getRange(esh.getLastRow()+1,1,1,1).getCell(1, 1).setValue(a);
  esh.getRange(esh.getLastRow(),2,1,1).getCell(1, 1).setValue(b);
  esh.getRange(esh.getLastRow(),3,1,1).getCell(1, 1).setValue(c);
  esh.getRange(esh.getLastRow(),4,1,1).getCell(1, 1).setValue(id);
 var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy")
  var sheet=ss.insertSheet().setName(date);
  var table='<table>'
  table+='<tr>'+'<th>'+'MEDICINE'+'</th>'+'<th>'+'DOSAGE'+'</th>'+'<th>'+'TIME'+'</th>'+'</tr>'
  for(i=0;i<10;i++)
  {
    table+='<tr>'
    for(j=0;j<3;j++)
    {
      table+='<td>'+'<input type="text" id="'+i+j+'"'+'</td>'
    }
    table+='</tr>'
  }
  table+='</table>'
  return{'table':table,'shname':date,'shid':id}
}
function submitbutton(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,sheet,id)
{
  ss=SpreadsheetApp.openById(id).getSheetByName(sheet).getRange(1,1,10,3);
  ss.getCell(1,1).setValue(a1);
  ss.getCell(2,1).setValue(a2);
  ss.getCell(3,1).setValue(a3);
  ss.getCell(4,1).setValue(a4);
  ss.getCell(5,1).setValue(a5);
  ss.getCell(6,1).setValue(a6);
  ss.getCell(7,1).setValue(a7);
  ss.getCell(8,1).setValue(a8);
  ss.getCell(9,1).setValue(a9);
  ss.getCell(10,1).setValue(a10);
    ss.getCell(1,2).setValue(b1);
  ss.getCell(2,2).setValue(b2);
  ss.getCell(3,2).setValue(b3);
  ss.getCell(4,2).setValue(b4);
  ss.getCell(5,2).setValue(b5);
  ss.getCell(6,2).setValue(b6);
  ss.getCell(7,2).setValue(b7);
  ss.getCell(8,2).setValue(b8);
  ss.getCell(9,2).setValue(b9);
  ss.getCell(10,2).setValue(b10);
    ss.getCell(1,3).setValue(c1);
  ss.getCell(2,3).setValue(c2);
  ss.getCell(3,3).setValue(c3);
  ss.getCell(4,3).setValue(c4);
  ss.getCell(5,3).setValue(c5);
  ss.getCell(6,3).setValue(c6);
  ss.getCell(7,3).setValue(c7);
  ss.getCell(8,3).setValue(c8);
  ss.getCell(9,3).setValue(c9);
  ss.getCell(10,3).setValue(c10);
  var message ="<html>"+"<body>"+"<div>"+"<h2>"+"YOUR PRESCRIPTION"+"</h2>"+"<table style='border-collapse: collapse;width: 100%;'>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<th style=' background-color: black;color: white;text-align: left;padding: 8px;'>"+"MEDICINE"+"</th>";
  message=message+"<th style=' background-color: black;color: white;text-align: left;padding: 8px;'>"+"DOSAGE"+"</th>";
  message=message+"<th style=' background-color: black;color: white;text-align: left;padding: 8px;'>"+"TIME"+"</th>";
  message=message+"</tr>"; 
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a1+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b1+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c1+"</td>";
  message=message+"</tr>"; 
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a2+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b2+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c2+"</td>";
  message=message+"</tr>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a3+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b3+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c3+"</td>";
  message=message+"</tr>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a4+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b4+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c4+"</td>";
  message=message+"</tr>"; 
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a5+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b5+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c5+"</td>";
  message=message+"</tr>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a6+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b6+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c6+"</td>";
  message=message+"</tr>";
    message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a7+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b7+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c7+"</td>";
  message=message+"</tr>"; 
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a8+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b8+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c8+"</td>";
  message=message+"</tr>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a9+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b9+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c9+"</td>";
  message=message+"</tr>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style='text-align: left;padding: 8px'>"+a10+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+b10+"</td>";
  message=message+"<td style='text-align: left;padding: 8px'>"+c10+"</td>";
  message=message+"</tr>"; 
  message=message+"</table>"+"</div>"+"</body>"+"</html>";
  
  message=message + "<div>"+"<h2>"+"<a href='https://docs.google.com/forms/d/1naFVIHfwTchRTK82d1S5_UrwpJ8kXjT0CQYPSP579pk/edit'>Click here to feedback for above said drugs"+"</a></h2></div>";
  GmailApp.sendEmail ("aptage@gmail.com" ,"Your prescription","Following is --" ,{htmlBody: message});
}

function submituserfeedback(review,rating){
  alert('Yes');
  var message ="<html>"+"<body>"+"<div>"+"<h2>"+"FEEDBACK FROM USER"+"</h2>"+"<table style='border-collapse: collapse;width: 100%;'>";
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style=' text-align: left;padding: 8px;'>"+"REVIEW"+"</td>";
  message=message+"<td style=' text-align: left;padding: 8px;'>"+review+"</td>";
  message=message+"</tr>"; 
  
  message=message+"<tr style='background-color: #f2f2f2'>";
  message=message+"<td style=' text-align: left;padding: 8px;'>"+"RATING(/10)"+"</td>";
  message=message+"<td style=' text-align: left;padding: 8px;'>"+rating+"</td>";
  message=message+"</tr>";

  message=message+"</table></div>";
  GmailApp.sendEmail ("aptage@gmail.com" ,"User Feedback","Following is --" ,{htmlBody: message});
}
function suggestionbutton(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,sheet,id)
{
  ss=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('temp').clear();
  ss=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('temp').getRange(1, 1,10,2);
  ss.getCell(1,1).setValue(a1);
  ss.getCell(2,1).setValue(a2);
  ss.getCell(3,1).setValue(a3);
  ss.getCell(4,1).setValue(a4);
  ss.getCell(5,1).setValue(a5);
  ss.getCell(6,1).setValue(a6);
  ss.getCell(7,1).setValue(a7);
  ss.getCell(8,1).setValue(a8);
  ss.getCell(9,1).setValue(a9);
  ss.getCell(10,1).setValue(a10);
  suggestion();
  values=ss.getValues();
  var table='<table>'
  table+='<tr>'+'<th>'+'MEDICINE'+'</th>'+'<th>'+' ALTERNATE MEDICINE'+'</th>'+'</tr>'
  for(i=0;i<10;i++)
  {
    table+='<tr>'
    for(j=0;j<2;j++)
    {
      table+='<td>'+values[i][j]+'</td>'
    }
    table+='</tr>'
  }
  table+='</table>'
  Logger.log(table)
  return{'table':table}
}
