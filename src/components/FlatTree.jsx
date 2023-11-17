import { Divider, Tree, Spin } from 'antd'
import { DownOutlined, LoadingOutlined } from '@ant-design/icons'

const FlatTree = ({ treeData, loading, handleSelect }) => {
  return (
    <div>
      <Divider orientation='left'>Flats</Divider>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24
            }}
            spin
          />
        }>
        <Tree
          showLine
          height={500}
          onSelect={handleSelect}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      </Spin>
    </div>
  )
}
export default FlatTree
