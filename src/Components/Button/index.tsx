import "./index.css"


interface IButton{
    name:string,
    active:boolean;
    handle:()=>void;
}

const Button = (props:IButton) => {
    const{
        name,
        active,
        handle,
    }=props;
    return (
        <button className={"Button "+ active ? " Button_active " :""} onClick={handle}>
            { name }
        </button>
    )

}

export default Button