import Bar from "@/components/Bar"
import './index.scss'
const Home = () => {
  return (
    <div className="home">
      <Bar
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title='Satisfaction Rate' />

      <Bar
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title='Usage' />
    </div>
  )
}

export default Home