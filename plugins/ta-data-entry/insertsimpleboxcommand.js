import Command from "@ckeditor/ckeditor5-core/src/command";
import './theme/dataEntry.css';

export default class InsertSimpleBoxCommand extends Command {
  

  execute(label, id) {
    this.editor.model.change((writer) => {
      switch(label) {
				case "Single-line field":
          this.editor.model.insertContent(createSimpleBox(writer, label, id));
					break;
        case "Multi-line field":
					this.editor.model.insertContent(createMultiLineBox(writer, label));
          break;
      }
    });
  }
  
  refresh() {
    console.log("refresh is called")
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "simpleBox"
      );
    
      this.isEnabled = allowedIn !== null;
    }
  }
  
  function createSimpleBox(writer, label, id) {
    const simpleBox = writer.createElement("simpleBox", {id: id});
    console.log("create is called============================")
    const simpleBoxTitle = writer.createElement("simpleBoxTitle", {value: label, type: 'text'});
    const simpleBoxDescription = writer.createElement("simpleBoxDescription");
    const paragraph = writer.createElement("singleLineDescriptionParagraph")

    writer.append(simpleBoxTitle, simpleBox);
    writer.append(simpleBoxDescription, simpleBox);
    writer.append(paragraph, simpleBoxDescription);

    return simpleBox;
}


function createMultiLineBox(writer, label) {
  const simpleBox = writer.createElement("simpleBox",  {styles: {
    'border': '2px solid',
}});
const simpleBoxTitle = writer.createElement("simpleBoxTitle");

const multiLineBoxDescription = writer.createElement("multiLineBoxDescription");

const paragraph = writer.createElement("multiLineDescriptionParagraph")

writer.append(simpleBoxTitle, simpleBox);
writer.append(multiLineBoxDescription, simpleBox);
writer.append(paragraph, multiLineBoxDescription);

return simpleBox;
}