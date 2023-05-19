

/*--- Donwload file txt ---*/

function download() {
    var text = document.getElementById("my-textarea").value;
    var extention = document.getElementById("extention").value;
    var title = document.getElementById("title").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain" });
    var anchor = document.createElement("a");
    if(title != ''){
      if(extention !=''){
          anchor.download = title+"."+extention;
      }else{
           anchor.download = title + ".txt";
      }
      
    }else{
        anchor.download = "File.txt";
    }
    
    anchor.href = window.URL.createObjectURL(blob);
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  // choose path ===
//   async function download() {
//     var text = document.getElementById("my-textarea").value;
//     var title = document.getElementById("title").value;
//     text = text.replace(/\n/g, "\r\n"); // To retain the line breaks.
//     const fileHandle = await window.showSaveFilePicker({
//       suggestedName: title + ".txt",
//       types: [{
//         description: 'Text Files',
//         accept: {
//           'text/plain': ['.txt']
//         }
//       }]
//     });
//     const writableStream = await fileHandle.createWritable();
//     await writableStream.write(text);
//     await writableStream.close();
//   }
  //donwload pdf
  function downloadAsPDF() {
    var text = document.getElementById("my-textarea").value;
    var title = document.getElementById("title").value;
    var container = document.createElement("div");
    container.style.padding = "40px"; // Adjust the padding value as needed
    container.innerText = text;
    if(title != ''){

        html2pdf().from(container).save(title + ".pdf");
    }else{
        html2pdf().from(container).save("File.pdf");
    }
    
  }


    //download pdf //
function creaPdf() {
    // Long text
    var titolo = document.querySelector('#input-fileName').value;
    var text = document.querySelector('#textarea').value;
    var repeat = parseInt(document.querySelector('#repeat').value) || 0;
    for (var i=0; i<repeat; i++) 
      text += text;
  
    // Create doc
    var ori = document.querySelector('#ori').checked ? "portrait":"landscape";
    var doc = new jsPDF(ori, 'mm', 'a4');
    doc.setFontSize(parseInt(document.querySelector('#fontsize').value) || 20)
  
    // Page size
    var pageSize = { h: doc.internal.pageSize.height, w: doc.internal.pageSize.width };
    var margin = {top:20,left:15,bottom:15,right:15};
    var lineHeight = doc.getTextDimensions("M").h / 2.54;// in to mm
    console.log("SIZE: ", pageSize, lineHeight);
    
    // Pages handler
    var linePos=0, nbPage=0;
    function addPage(doc) {
      if (nbPage) doc.addPage();
      else nbPage = 0;
      nbPage++;
      linePos = margin.top;
      // Header
      // var title = document.querySelector('#input-fileName').value;
      // var twidth = doc.getTextDimensions(title).w / 2.54;
      // doc.text(pageSize.w/2 -twidth/2, margin.top, title);
      // doc.rect(margin.left, margin.top -lineHeight, 
      //          pageSize.w -margin.left - margin.right, 
      //          1.5*lineHeight)
      // Footer
      var title = document.querySelector('#input-fileName').value;
      var numPage = 'page '+nbPage;
      var nwidth = doc.getTextDimensions(numPage).w / 2.54;
      doc.text(pageSize.w -margin.right -nwidth, 
               pageSize.h -margin.bottom -lineHeight, 
               numPage);
      doc.line(margin.left, pageSize.h -margin.bottom -2*lineHeight, 
               pageSize.w - margin.right, 
               pageSize.h -margin.bottom -2*lineHeight)
      //
      linePos = margin.top + 2*lineHeight;
      return nbPage;
    }
    function addLine(doc, text) {
      doc.text(margin.left, linePos, text);
      linePos += lineHeight;  
      if (linePos > pageSize.h-2*margin.bottom) {
        addPage(doc);
      }
    }
  
    // Split text to page width
    text = doc.splitTextToSize(text,pageSize.w-margin.left-margin.right);
  
    addPage(doc);
    for (var i=0; i<text.length; i++){  
      addLine(doc, text[i]);
    }
    doc.save(titolo + '.pdf')
  }
  
  
  



/*--- Change Direction  ---*/

 $("body").on('input', 'textarea', function() {

  

      var el  = $(this);

      var len = el.val().length;

  

      if (len <= 1){

        var x = new RegExp("[A-Za-z]"); // is ascii

        var isAscii = x.test(el.val().substring(0, 1));

        if(isAscii){

            el.css("direction", "ltr");

        } else {

            el.css("direction", "rtl");

        }

    }

  

});

/*--- Clear text area  ---*/

var input = document.querySelector('#clear');

var textarea = document.querySelector('#my-textarea');



input.addEventListener('click', function () {

    textarea.value = '';

}, false);

