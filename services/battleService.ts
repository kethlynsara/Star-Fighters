import { Octokit } from "@octokit/core";
import { battleRepository } from "../repositories/battleRepository.js";

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
        let result = {};

        const username1 = await battleRepository.select(firstUser);
        const username2 = await battleRepository.select(secondUser);

        if (starsRepos1 > starsRepos2) {
            await username1.rows[0] ? battleRepository.update("wins", firstUser) : battleRepository.insertWinner(firstUser);
            await username2.rows[0] ? battleRepository.update("losses", secondUser) : battleRepository.insertLoser(secondUser);
            result = {
                    "winner": firstUser,
                    "loser": secondUser,
                    "draw": false 
            }
        } else if (starsRepos1 < starsRepos2) {
            await username2.rows[0] ? battleRepository.update("wins", secondUser) : battleRepository.insertWinner(secondUser);
            await username1.rows[0] ? battleRepository.update("losses", firstUser) : battleRepository.insertLoser(firstUser);
            result = {
                "winner": secondUser,
                "loser": firstUser,
                "draw": false
            }
        } else {
            await username1.rows[0] ? battleRepository.update("draws", firstUser) : battleRepository.insertDraw(firstUser);
            await username2.rows[0] ? battleRepository.update("draws", secondUser) : battleRepository.insertDraw(secondUser);
            result = {
                "winner": null,
                "loser": null,
                "draw": true
            }
        }
        return result;
    } else {
        return null;
    }
    
}

export const battleService = {
    postBattle
}