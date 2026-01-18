import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DeveloperCard({ username }) {
  // 1. The State (The Bucket)
  const [githubData, setGithubData] = useState(null);

  // 2. The Effect (The Fetcher)
  useEffect(() => {
    if (!username) return;

    const fetchGithubProfile = async () => {
      try {
        // FIXED: Using the dynamic prop instead of hardcoded string
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    fetchGithubProfile();
    // REMOVED ILLEGAL RETURN FROM HERE
  }, [username]);


  // 3. The Loading State (Placed CORRECTLY in the main body)
  if (!githubData) {
      return (
        <Card className="bg-gray-50 p-6 w-full border border-gray-200 animate-pulse mb-4">
            <p className="text-center text-gray-400">Loading {username}...</p>
        </Card>
      );
  }

  // 4. The Final UI (The Render)
  return (
    <Card className="bg-white p-6 w-full border border-gray-200 shadow-sm mb-4">
        <CardHeader className="p-0 pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">
                Dev Profile
            </CardTitle>
            <CardDescription className="text-blue-600 font-medium">
               {githubData.name || username}
            </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4 flex flex-col items-center gap-4">
            <img 
                src={githubData.avatar_url} 
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-gray-100"
            />
            
            <div className="text-center">
                <p className="text-sm text-gray-700">
                    Public Repos: <strong>{githubData.public_repos}</strong> 🚀
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {githubData.bio ? githubData.bio.substring(0, 60) + "..." : "No bio available."}
                </p>
            </div>

            <Button 
                variant="outline"
                className="w-full text-xs"
                onClick={() => window.open(githubData.html_url, '_blank')}
            >
                View GitHub
            </Button>
        </CardContent>
    </Card>
  );
}