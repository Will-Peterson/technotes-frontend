import {useGetNotesQuery} from './notesApiSlice'
import Note from './Note'

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery()

  let content

  if (isLoading) content = <p>Loading...</p>
  
  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const {ids} = notes
    
    const tableContent = ids?.length
      ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
      : null

    content = (
      <table className='table table--notes'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th note_status'>Username</th>
            <th scope='col' className='table__th note_created'>Created</th>
            <th scope='col' className='table__th note_updated'>Updated</th>
            <th scope='col' className='table__th note_title'>Title</th>
            <th scope='col' className='table__th note_username'>Owner</th>
            <th scope='col' className='table__th note_edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content

}

export default NotesList