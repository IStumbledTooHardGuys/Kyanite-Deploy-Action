import * as core from '@actions/core'
import axios from 'axios';

export async function run(): Promise<void> {
  try {
    const key: string = core.getInput('secret_key')
    const host: string = core.getInput('host')
    const slug: string = core.getInput('slug')

    core.info("Attempting to inform Kyanite on " + host);

    const res = await axios.post(`${host}/${slug}`, undefined, {
      headers: {
        "X-Kyanite-Deployment-Security": key
      }
    });

    core.info(`${res.status} ${res.statusText}: ${res.data}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
