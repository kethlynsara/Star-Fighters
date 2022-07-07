import { Octokit } from "@octokit/core";
import db from "../database.js";

async function getUserRepos(username: string) {
    const octokit = new Octokit();

    try {
        const {data} = await octokit.request(`GET /users/${username}/repos`, {
            username: username.toUpperCase()
        })
    
        return data;
    } catch (error) {
        console.log(error.response.data);
        return null;
    }
}

async function getStars(repos1: any[], repos2: any[]) {
    let starsRepos1: number = 0;
    let starsRepos2: number = 0;

    console.log('compare', repos1, "compare")
    repos1.forEach((repo) => {
        starsRepos1 += repo.stargazers_count
    })

    repos2.forEach((repo) => {
        starsRepos2 += repo.stargazers_count
    })

    return { starsRepos1, starsRepos2 };

}

async function postBattle(firstUser: string, secondUser: string) {    
    const repos1 = await getUserRepos(firstUser);
    const repos2 = await getUserRepos(secondUser);

    if (repos1 && repos2) {
        const stars = await getStars(repos1, repos2);
        const { starsRepos1, starsRepos2 } = stars;

        //select - user no banco. Se tiver, update. Se não, insert
        const r = await db.query("SELECT * FROM fighters WHERE USERNAME = $1", [firstUser]);
        console.log('database', r.rows)

        if (starsRepos1 > starsRepos2) {
            //1 winner
        } else if (starsRepos1 < starsRepos2) {
            //2 winner
        } else {
            //empate
        }

        return stars;
    } else {
        return null;
    }
    
}

export const battleService = {
    postBattle
}