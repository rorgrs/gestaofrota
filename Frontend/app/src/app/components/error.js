export default function AlertError({ message, onClose }) {
    return (
        <div className="fixed top-4 right-4 bg-red-500 text-white rounded-lg p-4 shadow-lg transition-opacity duration-300 ease-in-out">
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-2 font-bold">X</button>
            </div>
        </div>
    );
}
