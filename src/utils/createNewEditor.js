import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import Checklist from "@editorjs/checklist";
import { uploadImage } from "./index";

export default () => {
  const editor = new EditorJS({
    logLevel: "ERROR",
    placeholder: "Start taking notes...",
    initialBlock: "paragraph",
    autofocus: true,
    tools: {
      header: {
        class: Header,
        inlineToolbar: ["link"],
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true,
          },
        },
      },
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: process.env.REACT_APP_LINK_PREVIEW,
        },
      },
      image: {
        class: ImageTool,
        config: {
          uploader: {
            uploadByFile(file) {
              return uploadImage(file);
            },
          },
        },
      },
    },
  });

  return editor;
};
