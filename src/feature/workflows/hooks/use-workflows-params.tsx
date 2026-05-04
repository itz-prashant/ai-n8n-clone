import {useQueryStates} from 'nuqs'
import { workFlowsParams } from '../params'

export const useWorkFlowsParams = ()=>{
    return useQueryStates(workFlowsParams)
}