
export type ItemProps = {
    id: string;
}

export const Item: React.FC<ItemProps> = (props: ItemProps) => {
    return(
        <div>I am {props.id}</div>
    )
}