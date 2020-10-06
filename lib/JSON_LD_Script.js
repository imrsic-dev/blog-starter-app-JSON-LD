export default function JSON_LD_Script(data, creator, router) {
    return (
        <script
            // key={`jobJSON-${post.id}`}
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(creator(data, router)) }}
        />
    )
}