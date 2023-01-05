const Notification = (props) => {
    const {message, type = "info"} = props
    if (message === null) {
        return null
    }
    var style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }
    if (type === 'error') {
        style = {...style, color: 'red'}
    }
    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification
