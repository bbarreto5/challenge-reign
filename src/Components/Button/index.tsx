import "./index.css"


interface IButton{
    name:string,
    active:boolean;
}

const Button = (props:IButton) => {
    const{
        name,
        active
    }=props;
    return (
        <button className={"Button "+ active ? "Button_active" :""}>
            { name }
        </button>
    )

}

export default Button