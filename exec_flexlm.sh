#!/bin/bash

servers=()

servers+=("27645@licenses.lsc.ic.unicamp.br,quartus + modelsim + xilinx")
servers+=("5280@cadence.fee.unicamp.br,cadence (irun, genus, innovus, virtuoso, jasper, ...)")

case $1 in
  0)
    for i in "${servers[@]}"; do
      IFS=','; read server description <<< "${i}"

      output=$(cat test_flex_0.txt | grep 'license server UP')
      # output=$(./lmutil lmstat -c ${server} | grep 'license server UP')

      status='down'
      [[ ! -z "${output}" ]] && status='up'

      echo "${server};${description};${status}"
    done
    ;;
  1)
    output=$(cat test_flex_1.txt | grep 'Users of\|, start')
    # output=$(./lmutil lmstat -c $2 -a | grep 'Users of')

    echo "${output}"
    ;;
  2)
    output=$(cat test_flex_2.txt | grep '[0-9]\.')
    # output=$(./lmutil lmstat -c $2 -i | grep '[0-9]\.')

    echo "${output}"
    ;;
  *)
    echo '[error] invalid argument'
esac
