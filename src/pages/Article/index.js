import { Link, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { http } from '@/utils'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelStore } = useStore()

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    // 更新列表
    setParams({
      page: 1,
      per_page: 8
    })
  }

  const navigate = useNavigate()
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`)
  }

  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: data => <Tag color="green">Approved</Tag>
    },
    {
      title: 'Time',
      dataIndex: 'pubdate'
    },
    {
      title: 'Reads',
      dataIndex: 'read_count'
    },
    {
      title: 'Comments',
      dataIndex: 'comment_count'
    },
    {
      title: 'Likes',
      dataIndex: 'like_count'
    },
    {
      title: 'Action',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" onClick={() => goPublish(data)} icon={<EditOutlined />} />
            <Popconfirm
              title="Are you sure to delete this article?"
              onConfirm={() => delArticle(data)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]



  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: ['http://geek.itheima.net/resources/images/15.jpg'],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]



  // 文章列表数据管理
  const [article, setArticleList] = useState({
    list: [],
    count: 0
  })

  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 8
  })

  // 发送接口请求
  useEffect(() => {
    async function fetchArticleList () {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    fetchArticleList()
  }, [params])

  // 筛选功能
  const onSearch = values => {
    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
      ...params,
      ..._params
    })
  }

  const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page
    })
  }


  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Overview</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Posts</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onSearch}
          initialValues={{ status: -1 }}>
          <Form.Item label="Status" name="status">
            <Radio.Group style={{ marginLeft: 10 }}>
              <Radio value={-1}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>To be reviewed</Radio>
              <Radio value={2}>Approved</Radio>
              <Radio value={3}>Disapproved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Select article channel"
              // defaultValue="lucy"
              style={{ width: 200 }}
            >
              {channelStore.channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" >
            <RangePicker style={{ marginLeft: 22 }}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 66 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`Search results: ${article.count} articles found`}>
        <Table rowKey="id" columns={columns} dataSource={article.list}
          pagination={{
            total: article.count,
            pageSize: params.per_page,
            onChange: pageChange,
            current: params.page
          }} />
      </Card>
    </div>
  )
}

export default observer(Article)