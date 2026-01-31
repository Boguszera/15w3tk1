import requests
import sys
import os
from urllib.parse import urlparse

GITHUB_TOKEN = ""  
# --------------------

def parse_github_url(url):
    """Parse the owner and leaves the repository with the URL."""
    parsed = urlparse(url)
    path_parts = parsed.path.strip("/").split("/")
    if len(path_parts) >= 2:
        return path_parts[0], path_parts[1]
    return None, None

def get_repo_tree(owner, repo, token=None):
    """Gets a file tree from the GitHub API (recursive)"""
    api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1"
    
    # Support for older repositories using 'master' instead of 'main'
    headers = {"Authorization": f"token {token}"} if token else {}
    response = requests.get(api_url, headers=headers)
    
    if response.status_code == 404:
        # Test for the master branch
        api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/master?recursive=1"
        response = requests.get(api_url, headers=headers)

    if response.status_code != 200:
        print(f"API Error: {response.status_code} - {response.text}")
        return None

    return response.json().get("tree", [])

def build_hierarchy(tree_data):
    """Converts a flat list of paths to a nested dictionary."""
    hierarchy = {}
    for item in tree_data:
        path = item["path"]
        parts = path.split("/")
        current = hierarchy
        for part in parts:
            if part not in current:
                current[part] = {}
            current = current[part]
    return hierarchy

def print_tree(hierarchy, prefix=""):
    """Recursively prints the tree structure."""
    keys = list(hierarchy.keys())
    keys.sort()
    
    for i, key in enumerate(keys):
        is_last = (i == len(keys) - 1)
        connector = "└── " if is_last else "├── "
        
        print(f"{prefix}{connector}{key}")
        
        # If it's a catalog (has children), we go deeper
        if hierarchy[key]:
            extension = "    " if is_last else "│   "
            print_tree(hierarchy[key], prefix + extension)

def main():
    if len(sys.argv) < 2:
        url = input("Provide a link to the GitHub repository: ")
    else:
        url = sys.argv[1]

    owner, repo = parse_github_url(url)
    
    if not owner or not repo:
        print("Invalid GitHub link format.")
        return

    print(f"\n--- Downloading structure for: {owner}/{repo} ---\n")
    
    tree_data = get_repo_tree(owner, repo, GITHUB_TOKEN)
    
    if tree_data:
        hierarchy = build_hierarchy(tree_data)
        print(f"{repo}/")
        print_tree(hierarchy)
        print(f"\nNumber of objects: {len(tree_data)}")
    else:
        print("Failed to download structure.")

if __name__ == "__main__":
    main()