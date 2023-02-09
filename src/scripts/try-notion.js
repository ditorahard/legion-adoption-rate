const { Client } = require('@notionhq/client');
const notion = new Client({ auth: 'secret_qixJhluvmGqeZp30qURV4TnGpCK3iGa1Y4iUVnZnG5m' });
notion.databases.query({
    database_id: '2b4155be9c924254a76aec16c9c4b722'
}).then(a => console.log(a))