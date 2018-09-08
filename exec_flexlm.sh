#!/bin/bash

servers=()

servers+=("26745@licenses.lsc.ic.unicamp.br,quartus + modelsim + xilinx")
servers+=("5280@cadence.fee.unicamp.br,cadence (irun, genus, innovus, virtuoso, jasper, ...)")

FLEXLM=

case $1 in
  0)
    for i in "${servers[@]}"; do
      IFS=','; read server description <<< "${i}"

      output=$(lmutil lmstat -c ${server} | grep 'license server UP')

      status='down'
      [[ ! -z "${output}" ]] && status='up'

      echo "${server};${description};${status}"
    done
    ;;
  1)
    output=$(lmutil lmstat -c $2 -a | grep 'Users of\|, start')

    echo "${output}"
    ;;
  2)
    output=$(lmutil lmstat -c $2 -i | grep '[0-9]\.')

    echo "${output}"
    ;;
  *)
    echo '[error] invalid argument'
esac
