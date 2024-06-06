
type ItemProps = {
    id: string;
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
    return(
        <div>I am {props.id}</div>
    )
}

export default Item;