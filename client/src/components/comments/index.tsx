import styles from './styles.module.scss';

export type CommentsProps = {
  prop?: string;
}

export function Comments({prop = 'default value'}: CommentsProps) {
  console.log(styles);
  // if (taskNameEditRef.current) {
  //   const context = taskNameEditRef.current.editor?.getContent({ format: 'raw' });
  //   console.log(context);
  //   console.log(taskNameEditRef.current.editor?.options.get('disabled'));
  //   console.log(taskNameEditRef.current.editor?.getContent({ format: 'tree' }).firstChild?.firstChild?.value);
  // }
  return (
    <div className={`Comments`}>
      {/*<Editor*/}
      {/*  apiKey="xaklva8e9bjuiltr9b15ny70o3pgzjze3meg4tn7ys9874th"*/}
      {/*  ref={taskNameEditRef}*/}
      {/*  initialValue={taskName}*/}
      {/*  disabled={!!taskName}*/}
      {/*  init={{*/}
      {/*    height: '100%',*/}
      {/*    inline: true,*/}
      {/*    auto_focus: true,*/}
      {/*    contextmenu: false,*/}
      {/*    xss_sanitization: true,*/}
      {/*    statusbar: false,*/}
      {/*    toolbar: false,*/}
      {/*    menubar: false*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}
