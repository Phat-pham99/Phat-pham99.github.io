import { useEffect, useState } from 'react';
import { SITE } from '../data/site.js';

const USERNAME = new URL(SITE.github).pathname.split('/').filter(Boolean)[0];
const PAGE_SIZE = 100;
let cache = null;

export async function fetchGitHubProjects(username, { signal } = {}) {
  const projects = [];

  for (let page = 1; ; page += 1) {
    const url = new URL(`https://api.github.com/users/${encodeURIComponent(username)}/repos`);
    url.search = new URLSearchParams({ type: 'owner', sort: 'updated', per_page: String(PAGE_SIZE), page: String(page) });
    const response = await fetch(url, {
      signal,
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
    });
    if (!response.ok) throw new Error(`GitHub projects unavailable (HTTP ${response.status}).`);
    const repositories = await response.json();
    if (!Array.isArray(repositories)) throw new Error('Invalid GitHub repository response.');

    projects.push(...repositories.map((repository) => ({
      repo: repository.name,
      displayName: repository.name,
      url: repository.html_url,
      description: repository.description || '',
      language: repository.language || null,
      tech: repository.topics || [],
    })));

    if (repositories.length < PAGE_SIZE) return projects;
  }
}

export default function useGitHubProjects() {
  const [state, setState] = useState(cache ?? { status: 'loading', projects: [] });

  useEffect(() => {
    if (cache) {
      setState(cache);
      return;
    }
    const controller = new AbortController();
    fetchGitHubProjects(USERNAME, { signal: controller.signal })
      .then((projects) => {
        if (controller.signal.aborted) return;
        cache = { status: 'ready', projects };
        setState(cache);
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error', projects: [] });
      });

    return () => controller.abort();
  }, []);

  return state;
}
