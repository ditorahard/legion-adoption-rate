@Library(['shared-library', 'pipeline-library']) _

PipelineDockerEntry([
    // Project Name
    // Adalah nama dari project anda. Nama sudah ditentukan di awal, mohon tidak di ubah tanpa komunikasi dengan tim Playcourt
    projectName: 'legion-ui',

    // Telegram Notification
    // Pada bagian ini anda dapat mengubah "telegramChatId" dengan chat id anda. Chat id akan digunakan untuk mengirim notifikasi setiap pipeline selesai
    telegramChatId: '-1001215679728',

    // Prerun Script
    // Pada bagian ini anda dapat menambahkan dan mengkonfigurasikan script untuk dijalankan sebelum melakukan test atau build service yang anda buat
    prerunAgent: 'Gitops', // "prerunAgent" dapat diubah sesuai dengan label agent pada https://jenkins.playcourt.id
    prerunAgentImage: 'playcourt/jenkins:nodejs12', // "prerunAgentImage" wajib didefinisikan jika menggunakan agent Docker
    prerunScript: {
        // "prerunScript" berisi groovy script yang akan dijalankan sebelum step test dan build
        // Pada bagian ini anda juga dapat membuat variable dan menggunakannya pada script yang lain

        // contoh script untuk mengambil secret dari Vault:
        // vault.createDotenv("dpe/legion-io/${env.BRANCH_NAME}/legion-adoption-rate")
        def vault = new Vault()
        NPM_AUTH = vault.vault("dpe/legion-ui/${env.BRANCH_NAME}/general", 'NPM_AUTH')
    },

    // Service Test
    // Pada bagian ini anda dapat menambahkan dan mengkonfigurasikan script untuk menjalankan test pada service yang anda buat
    testAgent: 'Docker', // "testAgent" dapat diubah sesuai dengan label agent pada https://jenkins.playcourt.id
    testAgentImage: 'playcourt/jenkins:nodejs12', // "testAgentImage" wajib didefinisikan jika menggunakan agent Docker
    runTestScript: {
        // "runTestScript" berisi groovy script untuk menjalankan test

        // contoh script untuk menjalankan test pada service nodejs
        // sh "npm install"
        // sh "npm run test"
    },

    // Build Docker Image
    // Pada bagian ini anda dapat mengkonfigurasikan script untuk membuat image dari service yang anda buat
    imageName: 'legion-ui-adoption-rate-fe', // "imageName" adalah nama dari service yang anda buat
    buildDockerImageScript: { String imageTag, String envStage ->
        // "buildDockerImageScript" berisi groovy script untuk melakukan build image
        // Image yang dibuat wajib menggunakan tag dari variable imageTag

        // contoh script untuk membuat image dan menggunakan variable yang dibuat pada prerunScript
        // sh "docker build --build-arg ARGS_NODE_BUILD=${envStage} --build-arg APP_KEY=${APP_KEY} --rm --no-cache -t ${imageTag} ."
        // def vault = new Vault()
        // vault.useDotenv()
        echo "${NPM_AUTH}"

        sh "docker build --build-arg NPM_AUTH=${NPM_AUTH} --build-arg ARGS_NODE_BUILD=${envStage} --rm --no-cache -t ${imageTag} ."
    },

    // Deployment
    // Pada bagian ini anda dapat mengkonfigurasi dimana service akan dideploy
    // Value dari variable ini sudah ditentukan di awal dan mohon tidak diubah tanpa komunikasi dengan tim Playcourt
    deployment: 'abc',

    // Post Run Script
    // Pada bagian ini anda dapat menambahkan script untuk dijalankan setelah proses pada pipeline selesai
    postrunScript: [
        always: {
            // Pada bagian ini script akan dijalankan setiap pipeline selesai
        },

        success: {
            // Pada bagian ini script hanya akan dijalankan jika pipeline sukses
        },

        failure: {
            // Pada bagian ini script hanya akan dijalankan jika pipeline gagal
        }
    ]
])
