import getCookie from "../utils/getCookie"

type ApiResponse = {
  message: String
}

type ListItemProps = {
  key: string,
  id: string,
  isCompleted: boolean,
  task: string,
  fetchTasks: () => void
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function ListItem({ key, id, isCompleted, task, fetchTasks }: ListItemProps) {
  async function handleDeleteClick() {
    const req = await fetch(`http://${BACKEND_URL}/tasks/${id}`,
      {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getCookie('token')}` }
      })
    const res: ApiResponse = await req.json();
    alert(res.message)
    if (req.status === 200) {
      fetchTasks()
    }
  }

  async function handleCheckboxChange(value: Boolean) {
    await fetch(`http://${BACKEND_URL}/tasks/${id}/?completed=${value}`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${getCookie('token')}` }
      })
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <input
            key={key}
            type="checkbox"
            className="mr-2"
            defaultChecked={isCompleted}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          />
          <p>{task}</p>
        </div>
        <button
          className="ml-auto border border-black rounded py-0.5 px-0.5"
          onClick={handleDeleteClick}
        >Delete</button>
      </div>
    </main>
  )
}