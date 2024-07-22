import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../../config/envconfig";
const RTE = ({ name, control, label, defaultValue = "",...props }) => {
  
  try {
    return (
      <div className="w-full">
        {label && <label className="inline-block mb-1 pr-1">{label}</label>}

        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange } }) => ( 
            <Editor
            {...props}
              initialValue={defaultValue}
              apiKey= {config.tinymcekey}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    );
  } catch (error) {
    return <p className="text-2xl font-bold text-red-600">{error}</p>;
  }
};

export default RTE;
