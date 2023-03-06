/*import React from 'react'

    interface MainPageProps {
        username: string;
      }


    enum TabsEnum {
        TRACK = 'Track',
        DASHBOARD = 'Dashboard',
        LEADERBOARD = 'Leaderboard',
        TODO_LIST = 'To-do list'
      }


    const MainPage: React.FC<MainPageProps> = ({ username }) => {
        const [currentTab, setCurrentTab] = useState(TabsEnum.TRACK);
      
        const handleTabChange = (tab: TabsEnum) => {
          setCurrentTab(tab);
        };

  return (
    <div>
    <header>
      <div>
        <h1>Main Page</h1>
      </div>
      <div>
        <div>Welcome, {username}!</div>
        <div>
          <Settings />
          <Profile />
          <SignOut />
        </div>
      </div>
    </header>
    <Tabs currentTab={currentTab} onTabChange={handleTabChange} tabs={Object.values(TabsEnum)} />
    {currentTab === TabsEnum.TRACK && <Track />}
    {currentTab === TabsEnum.DASHBOARD && <Dashboard />}
    {currentTab === TabsEnum.LEADERBOARD && <Leaderboard />}
    {currentTab === TabsEnum.TODO_LIST && <TodoList />}
  </div>
  )
}

export default MainPage*/