import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DeveloperCard() {
  // 1. The State (The Bucket)
  const [githubData, setGithubData] = useState(null);

  // 2. The Effect (The Fetcher)
  useEffect(() => {
    const fetchGithubProfile = async () => {
      try {
        const response = await fetch('https://api.github.com/users/SvAlpha');
        const data = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchGithubProfile();
  }, []);

  // 3. The UI (The Render)
  return (
    <Card className="bg-blue-50 p-6 w-full border-2 border-blue-200">
        <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xl font-bold text-blue-800">
                GSoC Developer
            </CardTitle>
            <CardDescription className="text-blue-600 font-semibold">
               {githubData ? githubData.name : "Loading..."}
            </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4 flex flex-col items-center gap-4">
            <img 
                src={githubData ? githubData.avatar_url : "https://github.com/identicons/jasonlong.png"} 
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            
            <div className="text-center">
                <p className="text-sm text-gray-700">
                    Public Repos: <strong>{githubData ? githubData.public_repos : 0}</strong> 🚀
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {githubData ? githubData.bio : "Fetching bio..."}
                </p>
            </div>

            <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(githubData?.html_url, '_blank')}
            >
                Visit GitHub Profile
            </Button>
        </CardContent>
    </Card>
  );
}