const ChatBubble: React.FC<{ style: "filled" | "outline"; content: String; }> = ({style, content}) => {
    const filledStyle = "bg-gradient-to-tr from-pink-500 to-purple-600 text-white"
    const outlineStyle = "text-gray-800 bg-gray-100"

    return <span
        style={{borderRadius: "20px 20px 20px 20px"}}
        className={"px-3 py-1.5 max-w-sm shadow-sm " + (style === "filled" ? filledStyle : outlineStyle)}>
        {content}
    </span>
}

export default ChatBubble