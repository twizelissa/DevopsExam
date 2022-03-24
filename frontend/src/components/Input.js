export default function Input({ ...props }) {
    return (
        <div className="block mt-6">
            <input value={props.data.st} onChange={(event) => props.data.sts(event.target.value)} className="border px-6 w-[400px] py-3 rounded focus:ring-4 focus:ring-blue-300 focus:outline-none transition" {...props} />
        </div>
    )
}