import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
export default function RTE({ name, control, label, defaultValue = "" }) {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="text-left font-bold w-full ">
      {label && <label className="text-gray">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="clx7cppxe53bw3sgnv7b16bfq9kkdljaxfwh1fgmshgwm2vy"
            initialValue={defaultValue}
            init={{
              initialValue: { defaultValue },
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
                "textcolor",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor |forecolor backcolor| alignleft aligncenter | image | code |  " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help |preview | anchor ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
