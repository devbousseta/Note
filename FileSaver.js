

/*--- Donwload file txt ---*/

function download() {
    var text = document.getElementById("my-textarea").value;
    var title = document.getElementById("title").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain" });
    var anchor = document.createElement("a");
    if(title != ''){
        anchor.download = title + ".txt";
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

