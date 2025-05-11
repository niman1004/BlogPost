import React from 'react'
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

function RTE({
    name , control , label 
}) {
  return (
    <div className='w-full'>
        {
            label && <label className='inline-block mb-1 pl-1'>{label}</label>
        }
        <Controller
        name={name || "content"}
        control={control}
        render={({field:{onChange , value}}) => (
            <Editor
             apiKey='rgc78ey8tjrwlkcg9js9ndcnzvlfjxqr46maybg00125xlu6'
            initialValue={value || ""}
            onEditorChange={onChange}
            init={{
                height:500 ,
                menubar:true,
                plugins:[
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
                     'image', 'link', 'lists', 'media', 'searchreplace', 'table',
                      'visualblocks', 'wordcount'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

               
            }}
            
            />
        )}
        />
      
    </div>
  )
}

export default RTE
