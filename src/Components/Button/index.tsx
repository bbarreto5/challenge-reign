import "./index.css"


interface IButton{
    name:string
}

const Button = (props:IButton) => {
    return (
        <button className="Button">
            {
                props.name
            }
        </button>
    )

}

export default Button